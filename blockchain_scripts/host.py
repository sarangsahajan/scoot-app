import aioipfs
import asyncio
import os
from aiohttp import web
from web3 import Web3

# Polygon RPC URL (Infura, Alchemy, or own node)
POLYGON_RPC_URL = "https://polygon-amoy.g.alchemy.com/v2/Tfy521pE2Li_shPTc9AgvPnYb_sj_Mwl"

# Smart contract address
CONTRACT_ADDRESS = "0xA639edfC96c4535a4a08534d6E890CceCb60C657"
# Host's private key (keep this secure in production)
PRIVATE_KEY = ""

# Initialize Web3 connection
w3 = Web3(Web3.HTTPProvider(POLYGON_RPC_URL))

# Load your contract ABI
with open(r'/home/ihsan/Documents/Projects/Hackathon/distributedRender/contract_abi.json', 'r') as file:
    contract_abi = file.read()

contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=contract_abi)

# Upload file to IPFS
async def upload_to_ipfs(file_path):
    client = aioipfs.AsyncIPFS(maddr='/dns4/localhost/tcp/5001')
    async for added in client.core.add(file_path):
        return added['Hash']

# Function to send transaction to the blockchain
def send_to_blockchain(ipfs_hash, file_name):
    try:
        account = w3.eth.account.from_key(PRIVATE_KEY)
        nonce = w3.eth.get_transaction_count(account.address)

        # Build transaction
        txn = contract.functions.storeFile(ipfs_hash, file_name).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': contract.functions.storeFile(ipfs_hash, file_name).estimate_gas({
                'from': account.address
            }),
            'gasPrice': w3.to_wei('25', 'gwei')
        })
        # Sign the transaction
        signed_txn = w3.eth.account.sign_transaction(txn, PRIVATE_KEY)
        # Send the transaction
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        return tx_hash
    except Exception as e:
        # Handle blockchain or IPFS errors gracefully and log them
        print(f"")
        return None  # Still return None to continue the process

# Route to handle file upload
async def handle_file_upload(request):
    reader = await request.multipart()
    file = await reader.next()
    
    # Save the file locally
    file_path = os.path.join("/tmp", file.filename)
    with open(file_path, 'wb') as f:
        while True:
            chunk = await file.read_chunk()
            if not chunk:
                break
            f.write(chunk)
    
    # Upload the file to IPFS
    ipfs_hash = await upload_to_ipfs(file_path)
    file_name = os.path.basename(file_path)

    # Store the IPFS hash on the blockchain
    tx_hash = send_to_blockchain(ipfs_hash, file_name)
    
    # Delete the file after processing
    os.remove(file_path)

    if tx_hash:
        return web.json_response({
            "ipfsHash": ipfs_hash,
            "transactionHash": tx_hash.hex(),
            "message": "File successfully uploaded and stored on the blockchain."
        })
    else:
        return web.json_response({
            "message": "An error occurred while storing the hash on the blockchain."
        }, status=500)

# Create the web application
app = web.Application()
app.router.add_post('/upload', handle_file_upload)

# Start the aiohttp server
if __name__ == "__main__":
    web.run_app(app, host='0.0.0.0', port=8000)

