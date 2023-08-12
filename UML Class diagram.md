```mermaid
classDiagram
    class User {
        - user_id: String
        - username: String
        - password: String
    }

    class Machine {
        # status: String
        + restart(): void
        + stop(): void
        + reset(): void
    }

    class VisionInspectionSystem{
        + inspection_resolution: String
        + defect_threshold: double
        + capture_image(target: Product): void
        + analyze_image(image_data: ImageData): quality
    }

    class Product{
        - serialNumber: String
        - quality: String
        - manufacturingDate: String
        + getSerialNumber(): String
        + getStatus(): String
        + getManufacturingDate(): String
    }

    class EnvironmentalMonitoringSensor{
        - temperature: Float
        - humidity: Float
        + readTemperature(): Float
        + readHumidity(): Float
        + getTemperature(): Float
        + getHumidity(): Float
    }

    class ProductMachine {
        # productionCount: int
        + getProductionCount(): int
        + calculateProduction(): int
    }


    Machine <|-- ProductMachine : is a
    VisionInspectionSystem --> Product: inspects
    ProductMachine --> Product : produces
    Machine "1" -- "0..1" User: is operated by

    
    
    

 