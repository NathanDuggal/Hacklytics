from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US', tz=360)

kw_list = "Bohemian Rhapsody Song".split(" ")
pytrends.build_payload(kw_list, cat=0, timeframe='today 5-y', geo='US-GA', gprop='youtube')

