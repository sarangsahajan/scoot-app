This is our team (Scoot)'s blockchain based GPU render farm for blender built on the Polygon chain.

Instructions to run the scripts:

Note: You might encounter errors when uploading files or retrieving them, it is due to aioipfs throwing errors 
about miscalculation of gas fees, the code will execute and make changes to the blockchain perfectly fine.

1. Install IPFS Kubo CLI (https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)
2. Download the latest version of blender (blender.org)
3. After installation, run IPFS CLI by using the command "ipfs daemon" and keep it running
4. Use pip install requirements.txt in ./blockchain_scripts folder
5. Run host.py file in ./blockchain_scripts folder by running 'python host.py'.
6. Install node dependencies in ./react-app folder with 'npm install' and run the react project by using 'npm start'.
7. Log into the site with random credentials and upload file which will be sent across the blockchain to the IPFS.
8. Run client.py file in ./blockchain_scripts folder by running 'python client.py' 
    which will fetch the file from the blockchain IPFS.
9. Now the file output will be rendered into render.png into the file directory.
10. Sending render output to back to host is incomplete due to time restrictions.



