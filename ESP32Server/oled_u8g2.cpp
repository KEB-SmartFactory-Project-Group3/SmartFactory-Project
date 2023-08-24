/********************************************************************************** 
 * Author : SCS
 * Date : 2018.09.30  
 * Description : SSD1306 OLED Display  
 * Reference: FontUsage.ino in u8g2 examples 
 * Modified     : 2022.10.03 : SCS : support arduino uno with ET-Upboard
 **********************************************************************************/

#include "oled_u8g2.h"

#include <Arduino.h>

#include <U8g2lib.h>

#ifdef U8X8_HAVE_HW_SPI
#include <SPI.h>
#endif
#ifdef U8X8_HAVE_HW_I2C
#include <Wire.h>
#endif

// 2018.09.05 : SCS
// U8g2 Contructor (Frame Buffer)
#if defined(ARDUINO_AVR_UNO)    
  // Slow
  U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, /* clock=*/ A0, /* data=*/ A1, /* reset=*/ U8X8_PIN_NONE);
#elif defined(ESP32)   
  // Fast
  U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);
#else
  #error "Unknown board"
#endif
// End of constructor

//=================================================================================
OLED_U8G2::OLED_U8G2() 
//=================================================================================	
{
	lineString[0] = "";	
	lineString[1] = "";	
	lineString[2] = "";		
}

//=================================================================================
void OLED_U8G2::setup(void) 
	//=================================================================================
{
  u8g2.begin();
  u8g2.clearBuffer();          // clear the internal memory
}

//=================================================================================
void OLED_U8G2::setLine(int line, char* buffer)
//=================================================================================
{  
  if (line < 1 || line > 3) return;
  lineString[line - 1] = buffer;  
}

//=================================================================================
void OLED_U8G2::display() 
//=================================================================================
{ 
	// Clear 
  u8g2.clearBuffer();          // clear the internal memory
  
  // First line
  u8g2.setFont(u8g2_font_9x15B_tf);	
  
  u8g2.setCursor(0,10);
  u8g2.print(lineString[0]);

  // Second line
  u8g2.setFont(u8g2_font_logisoso18_tf ); 
  
  u8g2.setCursor(0,35);
  u8g2.print(lineString[1]);  

  // Third line
  u8g2.setCursor(0,60);
  u8g2.print(lineString[2]);
  
  // Display
  u8g2.sendBuffer();					// transfer internal memory to the display
}
 
//=================================================================================
// End of Line
//=================================================================================