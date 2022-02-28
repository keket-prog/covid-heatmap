#This is a program that takes covid data from a dataset and represents it in a global choropleth map.
#This version of the choropleth map will show the show the confirmed cases and more detailed stats once the user hovers over the country.

import numpy as np 
import pandas as pd 
import plotly.express as px

#get the global covid dataset 
dataframe = pd.read_csv("country_wise_latest.csv")
dataframe.head()

#this print out all the data in the csv file onto the terminal
print(dataframe)

#removes the columns that arent going to be used in the program.
dataframe.drop(["Recovered", "Active", "New recovered", "Deaths / 100 Cases", "Recovered / 100 Cases", "Deaths / 100 Recovered", "Confirmed last week", "1 week change", "1 week % increase"],axis=1, inplace=True)

#prints out the new dataframe without the removed columns.
print(dataframe)

#this portion sets the choropleth map by using the data in the dataframe.
#Country names where used for mapping the geo location on the global map, whilst linking it to the country names in the csv file.
#the color is based on the confirmed cases.
#once the user hovers over a country it will display the covid stats of that particular country.
fig = px.choropleth(dataframe.reset_index(), 
                    locations="Country/Region",
                    locationmode = "country names",
                    color="Confirmed",
                    hover_data= dataframe.columns,
                   title= "Total covid cases")

#this will open up the choropleth map onto a new browser page with all the relevant details.
fig.show()
            