```mermaid
erDiagram
  User{
    id char(8) PK
    password VARCHAR(20)
    name VARCHAR(20)
  }

  OperationStop{
    machineNumber FK
    reason VARCHAR
    updateTime TIMESTAMP
  }

  products{
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
  
  camData{
    times TIMESTAMP PK
    productNumber INTEGER FK
    defectStatus BOOLEAN
  }

  
  products ||--o{ camData : "Reliant entity"
