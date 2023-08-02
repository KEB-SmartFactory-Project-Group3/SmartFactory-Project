```mermaid
erDiagram
  Administrator {
    AdminID VARCHAR PK
    AdminPW VARCHAR
    name VARCHAR
    role VARCHAR
    department VARCHAR
  }

  SensorData {
  ProductNumber INTEGER PK
    MachineID INTEGER
    temperature DOUBLE
    humidity DOUBLE
    CountTime TIMESTAMP
  }

  DetectionData {
    ProductNumber INTEGER FK
    DefectStatus BOOLEAN
  }

  OperationStop {
    reasonID INT PK
    reason VARCHAR
    updateTime TIMESTAMP
  }


  SensorData ||--o{ DetectionData : "Reliant entity"
