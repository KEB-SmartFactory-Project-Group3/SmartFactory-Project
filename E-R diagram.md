```mermaid
erDiagram
  user{
    id CHAR(8) PK
    password VARCHAR(20)
    name VARCHAR(20)
  }

  operationStop{
    stopTimes TIMESTAMP PK
    restartTimes TIMESTAMP 
    machineNumber VARCHAR(2) FK
    userID CHAR(8) FK
    reason VARCHAR
  }

  products{
    times TIMESTAMP PK
    machineNumber VARCHAR(2) PK,FK
    temperature DOUBLE
    count INT
  }

  machine{
    machineNumber VARCHAR(2) PK
  }

  factoryInfo{
    times TIMESTAMP PK
    factoryTemperature DOUBLE
    factoryHumidity DOUBLE
  }
  
  camMachine{
    times TIMESTAMP PK
    defectStatus BOOLEAN
  }

user }|..|| operationStop: ""
machine }|..|| products: ""
machine }|..|| operationStop: ""