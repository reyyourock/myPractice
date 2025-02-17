from bs4 import BeautifulSoup

import requests
import time

unfamiliar_skill = input('Skill you aren\'t familiar with >')
def find_jobs():
    html_text = requests.get('https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=python&txtLocation=').text # put url here later

    soup = BeautifulSoup(html_text, 'lxml')
    jobs = soup.find_all('li', class_= 'clearfix job-bx wht-shd-bx')
    for index, job in enumerate(jobs):
        published_date = job.find('span', class_ = 'sim-posted').span.text
        if "few" in published_date:
            company_name = job.find('h3', class_ = 'joblist-comp-name').text.strip()
            skills = job.find('span', class_ = "srp-skills").text.replace(' ', '')
            more_info = job.header.h2.a['href']
            if unfamiliar_skill not in skills:
                with open(f'jobs/{index}.txt', 'a') as f:

                    f.write(f"Company Name: {company_name.strip()}\n")
                    f.write(f"Required Skills: {skills.strip()}\n")
                    f.write(f'More Info: {more_info}\n')

if __name__ == '__main__':
    while True:
        find_jobs()
        wait_time = .5
        print(f"Waiting {wait_time} minutes")
        time.sleep(wait_time * 60)
