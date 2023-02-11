# Import Meteostat library and dependencies
from datetime import datetime
import matplotlib.pyplot as plt
from meteostat import Point, Hourly

# Set time period
start = datetime(2022, 1, 1, 0, 0)
end = datetime(2022, 1, 1, 23, 59)

# Create Point for Vancouver, BC
location = Point(33.7756, 84.3963, 10)

# Get daily data for 2018
data = Hourly(location, start, end)
data = data.fetch()

print(data)

# Plot line chart including average, minimum and maximum temperature
#data.plot(y=['tavg', 'tmin', 'tmax'])
#plt.show()