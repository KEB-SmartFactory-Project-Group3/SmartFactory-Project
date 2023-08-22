```mermaid
classDiagram

    class UserDetails {
        <<Interface>>
        + getAuthorities(): Collection
        + getPassword(): String
        + getUsername(): String
        + isAccountNonExpired(): boolean
        + isAccountNonLocked(): boolean
        + isCredentialsNonExpired(): boolean
        + isEnabled(): boolean
    }

    class User{
        <<Entity>>
        - id: String
        - name: String
        - password: String
        + getAuthorities(): Collection
        + getPassword(): String
        + getUsername(): String
        + isAccountNonExpired(): boolean
        + isAccountNonLocked(): boolean
        + isCredentialsNonExpired(): boolean
        + isEnabled(): boolean
    }


    class Products{
        <<Entity>>
        - serialNumber: String
        - state: String
        - productionTime: Timestamp
        - defectiveCount: int
        - count: int
    }

    class OperationStop{
        <<Entity>>
        - operationStopTime: Timestamp
        - operationTime: Time
        - userName: String
        - reason: String
        - nowRate: Double
    }

    class Conditions{
        <<Entity>>
        - times: Timestamp
        - factoryHumidity: Int
        - factoryTemperature: Double
        - isValid: boolean
    }

     class UserRepository{
        <<Repository>>
        + findById(): Optional
    }   

    class ProductsRepository{
        <<Repository>>
        + findFirstByOrderByCountDesc(): Products
    } 
        
    class OperationStopRepository{
        <<Repository>>
    }

    class ConditionsRepository{
        <<Repository>>
        + findFirstByOrderByTimesDesc(): Conditions
        + findFirstByOrderByFactoryTemperatureDesc(): Conditions
        + findFirstByOrderByFactoryHumidityDesc(): Conditions
        + findFirstByOrderByFactoryTemperatureAsc(): Conditions
        + findFirstByOrderByFactoryHumidityAsc(): Conditions
        + getAverageTemperature(): Double
        + getAverageHumidity(): Double
        + findByIsValidFalse(): List
    }

    class ConditionsService{
        <<Service>>
        - ConditionsRepository
        + saveConditions(): StringResultResponse
        + getCurrentConditions(): CurrentConditionsDTO
        + getStatisticsTemperatureHumidityData(): ConditionsStatisticsDTO
        + findAllOutliers(): List
    }

    class OperationStopService{
        <<Service>>
        - OperationStopRepository
        + findAllOperationStop(): List
    }

    class ProductsService{
        <<Service>>
        - ProductsRepository
        - GoalService
        + saveProducts(): StringResultResponse
        + getProductsCount(): CurrentProductsDTO
        + findAllProducts(): List
    }    

    class GoalService{
        <<Service>>
        - GOAL
        + saveGoalAmount(): Integer
        + calculateNowRate(): double
        + is_reachedToGoal(): boolean
        + reachedGoalAmount()
    }

    class DBResetService{
        <<Service>>
        - EntityManager
        - EXCLUDED_ENTITY_CLASSES: List
        + resetExceptSpecificTable()
        + getAllEntityClasses(): List
    }

    class ButtonService{
        <<Service>>
        - GoalService
        - DBResetService
        - OperationStopRepository
        - MachineURL: String
        + saveStopReason()
        + controlMachineState(): StringResultResponse
    }

    class JwtService{
        <<Service>>
        - SECRET_KEY: String
        + extractUserId(): String
        + extractClaim(): Function
        + generateToken(): String
        + generateToken(): String
        + isTokenValid(): boolean
        + isTokenExpired(): boolean
        + extractExpiration(): Date
        + extractAllClaims(): Claims
        + getSignInKey(): Key
    }

    class AuthenticationService{
        <<Service>>
        - UserRepository
        - PasswordEncoder
        - JwtService
        - AuthenticationManager
        + authenticate(): AuthLoginResponse
        + register(): StringResultResponse
    }
    
    class DuplicateIdException{
        + DuplicateIdException()
    }

    class AuthenticationController{
        <<Controller>>
        - AuthenticationService
        + register()
        + login()
        + logout()
    }

    class AuthenticationController{
        <<Controller>>
        - AuthenticationService
        + register()
        + login()
        + logout()
    }    

    class ButtonController{
        <<Controller>>
        - ButtonService
        - GoalService
        + stopMachine()
        + controlMachine()
        + saveGoalAmount()
    }

    class ConditionsController{
        <<Controller>>
        - ConditionsService
        + saveMachineData()
        + displayConditions()
        + displayStatistics()
        + getAllOutliers()
    }

    class OperationStopController{
        <<Controller>>
        - OperationStopService
        + getAllOperationStops()
    }
    
    class ProductsController{
        <<Controller>>
        - ProductsService
        + receiveData()
        + displayMachineInfo()
        + getAllProducts()
    }    

    class WeatherController{
        <<Controller>>
        - WeatherService
        + getCurrentWeather()
    }
    
    class ExceptionHandlerController{
        <<Controller>>
        + handleDuplicateIdException()
        + handleIllegalArgumentException()
    }
        
    class ExceptionHandlerController{
        <<Controller>>
        + handleDuplicateIdException()
        + handleIllegalArgumentException()
    }
    
    class MachineESP32{
        - times: String
        - count: Int
        + counting()
        + sendDataToServer()
        + machineReset()
        + machineOff()
        + machineOn()
    }

    class ConditionESP32{
        - times: String
        - factoryTemperature: Double
        - factoryHumidity: int
        - isValid: boolean
        + alarm()
        + sendDataToServer()
    }

    class CamESP32{
        - image
        + sendDataToServer()
    }

    class Flask{
        - serial_number: String
        - count: int
        - object_status: String
        - defective_count: int 
        - timestamp: String
        + fetch_and_process_image()
        + process_and_encode_image()
        + generate_serial_number()
        + receive_data_from_arduino()
        + send_to_backend()
        + continuous_object_detection_and_processing()
        + get_live_transmission()
    }


    Products --o ProductsRepository: Aggregation
    OperationStop --o OperationStopRepository: Aggregation
    Conditions --o ConditionsRepository: Aggregation
    UserRepository --o User: Aggregation
    User ..|> UserDetails: Realization


    AuthenticationService --> UserRepository: Association
    AuthenticationService --> JwtService: Association

    MachineESP32 ..> ProductsController: send to
    ConditionESP32 ..> ConditionsController: send to
    Flask ..> ProductsController: send to
    CamESP32 ..> Flask: send to

    ButtonService --> OperationStopRepository: Association
    ButtonService --> DBResetService: Association
    ButtonService --> GoalService: Association
    
    ProductsService --> GoalService: Association
    ProductsService --> ProductsRepository: Association

    ConditionsService --> ConditionsRepository: Association

    OperationStopService --> OperationStopRepository: Association


    AuthenticationController ..> AuthenticationService: Dependency

    ButtonController ..> ButtonService: Dependency
    ButtonController ..> GoalService: Dependency

    ConditionsController ..> ConditionsService: Dependency

    OperationStopController ..> OperationStopService: Dependency

    ProductsController ..> ProductsService: Dependency

    WeatherController ..> WeatherService: Dependency

    ExceptionHandlerController ..> DuplicateIdException: Dependency



    
    
    

 
    
    
    

 
