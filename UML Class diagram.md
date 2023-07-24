```mermaid
classDiagram
      SensorController -- TemperatureSensor
      SensorController -- HumiditySensor
      SensorController -- LightSensor
      SensorController -- Clock
      SensorController -- ObjectDetection
      SensorController : -GetSensorData()
      SensorController : -GetCommandFromClient()

      TemperatureSensor : -GetTemperature()
      HumiditySensor : -GetHumidity()
      LightSensor : -GetLightIntensity()
      Clock : -GetTime()

      ObjectDetection -- VisionAI
      ObjectDetection : -DetectObject()
      
      VisionAI : -ProcessImageData()

      BackendController -- JsonResponseParser
      BackendController -- DatabaseHandler
      BackendController -- VideoMonitoring
      BackendController -- WasteDisposal
      BackendController -- Optimization
      BackendController -- Alert
      BackendController : -RequestSensorData()
      BackendController : -SendCommandToServer()
      BackendController : -CalculateHourlyAverage()
      BackendController : -SaveSensorDataToDB()
      BackendController : -GetSensorDataFromDB()
      BackendController : -SendLiveDataToFrontend()
      BackendController : -IdentifyObjectQuality()
      BackendController : -OptimizeProductionLine()
      BackendController : -HandleWasteDisposal()
      BackendController : -SendAlerts()

      DatabaseHandler : -ConnectToDB()
      DatabaseHandler : -InsertData()
      DatabaseHandler : -FetchData()
      DatabaseHandler : -CalculateData()

      JsonResponseParser : -ParseJsonResponse()

      FrontendController -- LoginPage
      FrontendController -- SignUpPage
      FrontendController -- HomePage
      FrontendController -- LiveStatusPage
      FrontendController -- Graph
      FrontendController -- Button
      FrontendController -- AlertDisplay
      FrontendController : -Login()
      FrontendController : -SignUp()
      FrontendController : -GetLiveData()
      FrontendController : -RequestCommand()
      FrontendController : -DisplayObjectQuality()
      FrontendController : -DisplayAlerts()

      VideoMonitoring : -StreamVideo()
      WasteDisposal : -ProcessWaste()
      Optimization : -RunOptimizationAlgorithm()
      Alert : -TriggerAlert()

      Graph : -DisplayGraph()
      Button : -onClick()
      AlertDisplay : -ShowAlert()
