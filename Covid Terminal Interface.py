import requests
import json

response_API = requests.get('https://disease.sh/v3/covid-19/countries')
data = response_API.text
parse_json = json.loads(data)

#Checks if the response was successful before proceeding with the rest of the program.
def check_connection(response_API):
    if response_API.status_code == 200:
        print("***Successful Connection***")
        return True
    else:
        print("Failed to retrieve data!!!")
        return False

#Displays all covid data for each country in the world.
def view_all_data():
    number_of_countries = 229
    country_data = ""

    #displays the ios3, continent, country name, total cases, new cases, total deaths, new deaths, recovered and a link to the countries flag.
    for i in range(0,number_of_countries):
        country_index = i
        
        country_data = ("Country number: "+ str(country_index)
            +"\nCountry ios3: "+ str(parse_json[i].get("countryInfo").get("iso3")) 
            +"\nContinent: "+ str(parse_json[i].get("continent")) 
            +"\nCountry Name: "+ str(parse_json[i].get("country")) 
            +"\nTotal Cases: "+ str(parse_json[i].get("cases")) 
            +"\nNew Cases: "+ str(parse_json[i].get("todayCases")) 
            +"\nTotal Deaths: "+ str(parse_json[i].get("deaths")) 
            +"\nNew Deaths: "+ str(parse_json[i].get("todayDeaths"))
            +"\nRecovered: "+ str(parse_json[i].get("recovered")) 
            +"\nCountry flag: "+ str(parse_json[i].get("countryInfo").get("flag"))
            +"\n")
        print(country_data)

#Displays specific country data the user has inputted results for.
def display_country_data(response_API):
    number_of_countries = 229

    #try/except block will validate invalid input from the user and give an appropriate message or continue the program.
    try:
        country = input("Enter the name of the country to search:").title()
        found = False

    except:
        print("Error! Please ensure that you input the correct country name!")

    else:
        #displays the ios3, continent, country name, total cases, new cases, total deaths, new deaths, recovered and a link to the countries flag.
        for i in range(0, number_of_countries):             
            #once the country is found end the search/loop
            if country in parse_json[i].get("country"):

                country_data = ("Country ios3: "+ str(parse_json[i].get("countryInfo").get("iso3")) 
                +"\nContinent: "+ str(parse_json[i].get("continent")) 
                +"\nCountry Name: "+ str(parse_json[i].get("country")) 
                +"\nTotal Cases: "+ str(parse_json[i].get("cases")) 
                +"\nNew Cases: "+ str(parse_json[i].get("todayCases")) 
                +"\nTotal Deaths: "+ str(parse_json[i].get("deaths")) 
                +"\nNew Deaths: "+ str(parse_json[i].get("todayDeaths"))
                +"\nRecovered: "+ str(parse_json[i].get("recovered")) 
                +"\nCountry flag: "+ str(parse_json[i].get("countryInfo").get("flag"))
                +"\n")

                found = True
                print("\n***Country Infomation***")
                print(country_data)
                break 
        
        #if this condition executes this means the user didn't input the correct country name.
        if(found == False):
           print("Error! Please ensure that you input the correct country name!") 

if check_connection(response_API) == True:
    #loop menu options until user ends the program.
    while(True):
        #try/except block will validate invalid input from the user and give an appropriate message or continue the program.
        try:
            menu = int(input("*****Menu***** \n"
            +"1- View All Global Data \n"
            +"2- View Specific Country Data \n"
            +"3- Exit \n"
            +"Option: "))
            print("**************")

        except:
            print("Error! please input one of the provided menu options!")

        else:
            if(menu == 1):
                view_all_data() 

            elif(menu == 2):
                display_country_data(response_API)

            elif(menu == 3):
                print("Program ended.")
                break

            else:
                print("Error! please input one of the provided menu options!")