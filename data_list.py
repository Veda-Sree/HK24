import hashlib
import qrcode
import pandas as pd
import csv

data_list = ['bt720', 'Insugen-N 100IU/ml Refil Injection', 'Insulin Isophane (100IU)', '2025-02-09', '8 degree celsius','s3','injection',]

data_string = ', '.join(data_list)

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(data_string)
qr.make(fit=True)

img = qr.make_image(fill='black', back_color='white')

img.save("/Users/apple/Desktop/HK24/tabular_data_qrcode_list_again.png")

print("QR code generated and saved as tabular_data_qrcode_list_again.png")


hash_object = hashlib.sha256(data_string.encode())  
hash_hex = hash_object.hexdigest()  


row = [data_list[0], hash_hex]

with open('/Users/apple/Desktop/HK24/new_hash_data_list.csv', mode='a', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(row)

print("Hash saved to CSV.")
