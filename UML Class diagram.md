classDiagram
      SensorController -- TemperatureSensor
      SensorController -- HumiditySensor
      SensorController -- UltrasonicSensor
      SensorController -- LightSensor
      SensorController -- Camera
      SensorController : -getSensorData()

      TemperatureSensor : -getTemperature()
      HumiditySensor : -getHumidity()
      UltrasonicSensor : -getDistance()
      LightSensor : -getLightIntensity()

      Camera -- ObjectDetection
      Camera : -captureImage()
      
      ObjectDetection : -detectObjects()

      AlarmController -- Buzzer
      AlarmController -- Led
      AlarmController : -triggerAlarm()
      Buzzer : -sound()
      Led : -blink()
      

      User -- UserData
      User : +getRoles()
      UserData : -id
      UserData : -password
      UserData : -name

      OperationController -- Button
      OperationController : -startFactoryOperation()
      OperationController : -stopFactoryOperation()
      OperationController : -getElapsedTime()

      Button : +onClick()

      OperationStopRecord -- Machine
      OperationStopRecord : -stopTimes
      OperationStopRecord : -restartTimes
      OperationStopRecord : -reason

      ProductRecord -- Machine
      ProductRecord : -times
      ProductRecord : -temperature
      ProductRecord : -count

      Machine : -machineNumber

      MonitoringPlatformController -- MonitoringPlatformView
      MonitoringPlatformController -- DataCollector
      MonitoringPlatformController -- DataAnalyzer
      MonitoringPlatformController : +showLiveStatus()

      FactoryInfo : 
      
      MonitoringPlatformView : +displayElapsedTime()

      DataCollector -- DatabaseHandler
      DataCollector : -collectData()
      DataCollector : -saveDataToDB()

      DataAnalyzer -- DatabaseHandler
      DataAnalyzer : -analyzeData()
      DataAnalyzer : -getStatistics()

      DatabaseHandler : -connectToDB()
      DatabaseHandler : -insertData()
      DatabaseHandler : -fetchData()
      DatabaseHandler : -updateData()
