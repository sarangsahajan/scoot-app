import aioipfs, asyncio, os, shutil
from web3 import Web3
import bpy
POLYGON_RPC_URL = "https://polygon-amoy.g.alchemy.com/v2/Tfy521pE2Li_shPTc9AgvPnYb_sj_Mwl"

CONTRACT_ADDRESS = "0xA639edfC96c4535a4a08534d6E890CceCb60C657"
PRIVATE_KEY = ""

w3 = Web3(Web3.HTTPProvider(POLYGON_RPC_URL))

with open(r'C:\Users\moaha\Downloads\hackathon\new\contract_abi.json', 'r') as file:
    contract_abi = file.read()

contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=contract_abi)


async def upload_to_ipfs(file_path):
    client = aioipfs.AsyncIPFS(maddr='/dns4/localhost/tcp/5001')
    async for added in client.core.add(file_path):
        return added['Hash']

def send_to_blockchain(ipfs_hash, file_name):
    try:
        account = w3.eth.account.from_key(PRIVATE_KEY)
        nonce = w3.eth.get_transaction_count(account.address)

        txn = contract.functions.storeFile(ipfs_hash, file_name).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': contract.functions.storeFile(ipfs_hash, file_name).estimate_gas({
            'from': account.address
        }),
        'gasPrice': w3.to_wei('25', 'gwei')
    })
        signed_txn = w3.eth.account.sign_transaction(txn, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        return tx_hash
    except:
        print("Exception handled")

async def download_from_ipfs(ipfs_hash, file_name):
    async with aioipfs.AsyncIPFS() as client:
        try:
            temp_dir = os.path.join(os.getcwd(), "temp_ipfs_download")
            os.makedirs(temp_dir, exist_ok=True)
            
            await client.get(ipfs_hash, dstdir=temp_dir)
            print("File downloaded successfully.")
            
            downloaded_files = os.listdir(temp_dir)
            if not downloaded_files:
                raise Exception("No files were downloaded from IPFS")
            
            downloaded_file = os.path.join(temp_dir, downloaded_files[0])
            
            if os.path.isdir(downloaded_file):
                inner_files = os.listdir(downloaded_file)
                if not inner_files:
                    raise Exception("Downloaded directory is empty")
                downloaded_file = os.path.join(downloaded_file, inner_files[0])
            
            final_path = os.path.join(os.getcwd(), file_name)
            
            shutil.move(downloaded_file, final_path)
            
            shutil.rmtree(temp_dir)
            print(f"File saved as: {final_path}")
        except aioipfs.APIError as e:
            print(f"Error downloading file from IPFS: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")


def get_ipfs_hash_from_blockchain():
    ipfs_hash, file_name = contract.functions.getFile().call()
    print(f"IPFS hash retrieved from blockchain: {ipfs_hash} {file_name}")
    return ipfs_hash, file_name

if __name__ == "__main__":
    ipfs_hash, file_name = get_ipfs_hash_from_blockchain()
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(download_from_ipfs(ipfs_hash, file_name))

    bpy.ops.wm.open_mainfile(filepath='untitled.blend')
    bpy.context.scene.render.engine = 'BLENDER_EEVEE_NEXT'
    scene = bpy.context.scene
    scene.render.image_settings.file_format = 'PNG'
    scene.render.filepath = os.getcwd() + "/render.png"
    bpy.ops.render.render(write_still=True)

    file_path = os.getcwd() + "/render.png"
    ipfs_hash = loop.run_until_complete(upload_to_ipfs(file_path))
    file_name = os.path.basename(file_path)
    # loop.close()
    print(f"Uploaded to IPFS with hash: {ipfs_hash}")
    
    tx_hash = send_to_blockchain(ipfs_hash, file_name)
    print(f"Stored IPFS hash on blockchain in transaction: {tx_hash}")
    
        # Send the new IPFS hash back to the host
    loop.close()
