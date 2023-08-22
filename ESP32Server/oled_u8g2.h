/********************************************************************************** 
 * Author : SCS
 * Date : 2018.09.30  
 * Modified     : 2022.10.03 : SCS : support arduino uno with ET-Upboard
**********************************************************************************/

#ifndef OLED_U8G2_H
#define OLED_U8G2_H

#include <Arduino.h>

class OLED_U8G2{

private:	
  char* lineString[3];

public:
	OLED_U8G2();
	void setup(void);
  void setLine(int line, char* buffer);
	void display();	
};

#endif

//=================================================================================
// End of Line
//=================================================================================
