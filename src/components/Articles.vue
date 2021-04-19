<template>
  <div>
    <p class="title">  News Articles </p>
    <form action="https://www.straitstimes.com/singapore/transport/covid-19-pandemic-still-taking-a-toll-on-public-transport-worldwide">
      <input type="submit" value="Covid-19 Pandemic Still Taking A Toll On Public Transport Worldwide" class="article"/>
    </form> <br> 

    <form action="https://www.gov.sg/article/govsg-how-tos-how-to-stay-safe-on-public-transport">
      <input type="submit" value="How To Stay Safe On Public Transport" class="article"/>
    </form> <br> 

    <form action="https://www.straitstimes.com/singapore/transport/bus-train-ridership-in-singapore-falls-to-11-year-low-amid-covid-19-pandemic">
      <input type="submit" value="Bus, train ridership in Singapore falls to 11-year low amid Covid-19 pandemic" class="article"/>
    </form> <br>

    <form action="https://www.straitstimes.com/singapore/environment/green-pulse-podcast-can-evs-and-petrol-duty-hike-green-singapores-land">
      <input type="submit" value="Green Pulse Podcast: Can EVs and petrol duty hike green Singapore's land transport sector?" class="article"/>
    </form> <br> 

    <form action="https://www.channelnewsasia.com/news/singapore/jurong-region-line-jrl-mrt-stations-start-construction-ntu-jtc-14565092">
      <input type="submit" value="Construction on 4 Jurong Region Line stations to start in Q2" class="article"/>
    </form> <br> 

    <form action="https://www.channelnewsasia.com/news/singapore/go-ahead-to-conduct-six-month-trial-of-buses-with-solar-panels-14523682">
      <input type="submit" value="Go-Ahead to conduct six-month trial of buses with solar panels" class="article"/>
    </form> <br> 

    <form action="https://www.channelnewsasia.com/news/singapore/hougang-mrt-station-cross-island-line-start-construction-q4-14495982">
      <input type="submit" value="Hougang MRT station on Cross Island Line to start construction in Q4" class="article"/>
    </form> <br> 
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
div {
  float: left;
  width: 33%;
  height: 700px;
  background-color: darkseagreen;
  border-radius: 10px;
  padding-right: 10px;
}
.title {
  text-align: center;
  font-size: 40px;
  padding: 10px;
  width: 100%;
}

.article {
  position: relative;
  border-width: 1px;
  width: 90%;
  white-space: normal;
  font-size: 18px;
  color: black;
  background-color:rgb(242, 234, 141);
  height: 60px;
}
</style>
