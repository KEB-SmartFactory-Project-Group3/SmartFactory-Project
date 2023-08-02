```mermaid
erDiagram
  user{
    id VARCHAR(10) PK
    password VARCHAR(20)
    name VARCHAR(20)
  }

  operationStop{
    machineNumber VARCHAR(2) FK
    userID VARCHAR(10) FK
    reason VARCHAR
    updateTime TIMESTAMP
  }

  productsMachine{
    times TIMESTAMP PK
    machineNumber VARCHAR(2) PK
    temperature DOUBLE
    count INT
  }

  factoryInfo{
    times TIMESTAMP PK
    factoryTemperature DOUBLE
    factoryHumidity DOUBLE
  }
  
  camMachine{
    times TIMESTAMP PK
    productNumber INTEGER FK
    defectStatus BOOLEAN
  }

user }|..|| operationStop: References  
operationStop }|..|| productsMachine: References
productsMachine }|..|| factoryInfo: References
productsMachine }|..|| camMachine: References
