```mermaid
classDiagram
    class User {
        - user_id: String
        - username: String
        - password: String
        + login(): void
        + logout(): void
    }

    class Machine {
        # status: String
        # machine_id: String
        - user_id: String
        + restart(): void
        + stop(): void
        + reset(): void
        + calculate_production(output: int): void
    }

    class VisionInspectionSystem{
        + inspection_resolution: String
        + defect_threshold: double
        + capture_image(target: Products): void
        + analyze_image(image_data: ImageData): void
    }

    class Products{
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
        + readTemperature(): void
        + readHumidity(): void
        + getTemperature(): Float
        + getHumidity(): Float
    }

    class ProductionMachine {
        # production_count: int
        + getProductionCount(): int
    }


    Machine <|-- VisionInspectionSystem : is a
    Machine <|-- EnvironmentalMonitoringSensor : is a
    Machine <|-- ProductionMachine : is a
    VisionInspectionSystem --> Products: captures
    Machine --> User : has a

    
    
    

 