from cgitb import html
from bs4 import BeautifulSoup
import requests

file = 'C:/Users/devin/.vscode/myPractice/stockScraper/Stock-Prices.txt'
desiredStock = ['GME', 'NUMI.TO', 'RVV.CN', 'MMED.NE', 'AMC',
 'COST', 'RBLX', 'MSOS', 'TSLA', 'SPY', 'VTI']
def clearFile(file):
    with open(file, "w") as f:
        f.close()

def getStockPrice():
    global file
    clearFile(file)
    for i in range(len(desiredStock)):
        url = f'https://ca.finance.yahoo.com/quote/{desiredStock[i]}'
        text = requests.get(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"}).text

        soup = BeautifulSoup(text, 'lxml')

        price = soup.find('fin-streamer', class_= 'Fw(b) Fz(36px) Mb(-4px) D(ib)')['value']

        with open('Stock-Prices.txt', 'a') as file:
            file.write(f"{desiredStock[i]} Price: {price}\n")

clearFile(file)
getStockPrice()
print("complete")
