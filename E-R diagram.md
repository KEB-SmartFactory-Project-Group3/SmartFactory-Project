erDiagram
  user{
    userId CHAR(8) PK
    password VARCHAR(20)
    username VARCHAR(20) PK
  }

  factoryInfo{
    times TIMESTAMP PK
    factoryTemperature DOUBLE
    factoryHumidity DOUBLE
  }

  productionInfo{
    username VARCHAR(20) PK, FK
    count INT PK
    timestamp TIMESTAMP PK
    targetCount INT
    nowRate DOUBLE
  }

  stopInfo{
    username VARCHAR(20) PK, FK
    stopTimestamp TIMESTAMP PK, FK
    stopReason VARCHAR(10)
    nowRate DOUBLE  
    operatingTime TIME
  }
  
  productInfo{
    order(count) INT PK, FK
    serialNumber VARCHAR(15) PK
    quality VARCHAR(10)
    manufacturingDate TIME 
  }


 user ||--|{ stopInfo: ""
 user ||--|{ productionInfo: ""
 productionInfo ||--|| productInfo: ""
 productionInfo ||--|{ stopInfo: "" 

 
