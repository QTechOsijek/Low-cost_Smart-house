# Low-cost smart house

## Description 

Smart house is automated building which involves the control of light, heating, ventilation, security
and home appliances such as washer, oven, refrigerators or freezers, that use wireless communication for remote monitoring.

### Project summary

Entire project is based on wireless connection between Arduinos and Raspberry Pi, which is central point of whole smart house.
Raspberry Pi, in our case Model 3, is connected to Azure IoT Hub, and it's communicating with smartphone through Azure IoT Suite.

### Segments
> Central Unit

> Pet feeder

> Light control

> Vent control

> Light dimmer

> Sunblind control

> Application


#### Central Unit
Central unit will be the "heart" of the house. It will consist of Raspberry Pi 3 and temperature sensor. It's actually a link between application and Arduinos or pet feeder which will perform certain tasks. It's connected to house's router and Azure IoT Hub.

#### Pet feeder
Pet feeder's brain is Raspberry Pi Zero. Proximity sensor will send message to Raspberry and it will open feeder's door for animals to gain access to the food. Door will be opened by servo and the feeding mechanism will be controlled by stepper motor better control. Mass of food is going to be measured by BMP180 pressure sensor. BMP's callibration will be required.

#### Light control (OUTDOORS)
Light going on and off will be triggered by motion sensor (Option only available during the nights). It will also serve as a security system, because it will also automatically send message to owner whether light is triggered or not. It will not be  the most effective feature because "thief" could be a mail man etc. This will require a relay and an Arduino.


#### Vent control
Vent will be controlled via one Arduino and one relay. Application will control this feature.

#### Light dimmer
This will also require a relay and Arduino and it will be controlled by application.

#### Sunblind control
Requires an Arduino and a stepper motor and is controlled by application. Simply rotates the wheel which is supposed to raise and put down the sunblind.

#### Application 
Application is written in React Native and connected to Azure. It's backend is also on Azure. Most of functionalities will be available to do by application. Since React Native doesn't support WinPhone, app for WinPhone may be written in Xamarin.


### Technologies required

> Visual Studio 2015 (Xamarin and Raspberries)

> Windows 10 IoT Core (Raspberry)

> Arduino IDE

> Microsoft Azure (Backend and IoT Hub)

> Visual Studio Code and XCode (for iOS application)

