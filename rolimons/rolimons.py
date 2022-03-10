from bs4 import BeautifulSoup
import requests
import smtplib, ssl

notificationPrice = 1500000
notificationPriceCommas = "{:,}".format(notificationPrice)
sender = "notificationsformyapps@gmail.com"
password = "holmes619"
reciever = "devinbriscall@gmail.com"

port = 465

html_text = requests.get('https://www.rolimons.com/item/11748356').text

soup = BeautifulSoup(html_text, 'lxml')
price_div = soup.find('div', class_= "d-flex value-stat-box bg-primary")
price = soup.find('div', class_="value-stat-data").text
with open ('C:/Users/devin/.vscode/myPractice/rolimons/clockworkShades.txt', 'r+') as file:
    last_line = ''
    for row in file:
        last_line = row

    if price not in last_line:
        file.write(f"Current Price: {price}")

#below this handles the email sending
message = f"""\
Subject: Clockwork Shades Above {notificationPriceCommas}

Current Price: {price}
"""
price_int = int(price.replace(",", ""))

if price_int > notificationPrice:
    print("starting to send...")
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender, password)
        server.sendmail(sender, reciever, message)
    print("Sent e-mail!")
