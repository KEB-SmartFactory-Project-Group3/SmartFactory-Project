```mermaid
erDiagram
  Administer {
    AdminID VARCHAR PK
    AdminPW VARCHAR
    name VARCHAR
    role VARCHAR
    department VARCHAR
  }

  sensorData {
  ProductNumber INTEGER PK
    MachineID INTEGER
    temperature DOUBLE
    humidity DOUBLE
    CountTime TIMESTAMP
  }

  DetectionData {
    ProductNumber INTEGER PK
    DefectStatus BOOLEAN
  }

  ShutDown {
    reasonID INT PK
    reason VARCHAR
    updateTime TIMESTAMP
  }


  sensorData ||--o{ DetectionData : "Reliant entity"
