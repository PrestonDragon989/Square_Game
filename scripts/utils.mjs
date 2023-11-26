import Vector2 from "./vector.mjs";

class Utils {
    constructor() {
        this.utils = true;
        this.isThis = "This is, in fact, the Utils Class!"
    }
    
    //Random Number Between min and max
    randint(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
    
      randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    async getJson(filePath) {
      try {
        const response = await fetch(filePath);
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error('Error fetching or parsing the JSON file:', error);
        return null;
      }
    }
  }

//Exporting Utils to All of the Good boys and girls of this world who need it <3
export default Utils;