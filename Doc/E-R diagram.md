```mermaid
erDiagram
  User{
    id VARCHAR(25) PK
    password VARCHAR(25)
    username VARCHAR(25)
  }

  Products{
    serialNumber CHAR(6) PK
    count INT PK
    productionTime Datetime(6)
    defectiveCount INT
    state VARCHAR(25)
  }

  OperationStop{
    operationStopTime Datetime(6) PK
    nowRate DOUBLE  FK
    operatingTime TIME(6)
    reason VARCHAR(25)
    username VARCHAR(20)
  }
  
  Conditions{
    times Datetime(6) PK
    factoryTemperature DOUBLE
    factoryHumidity INT
    isValid bit
  }


 User O|--|{ OperationStop: ""
 Products O|--|{ OperationStop: ""

 
