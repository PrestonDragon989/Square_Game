// Define a Vector class
class Vector2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    // Calculate the magnitude (length) of the vector
    getMagnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  
    // Normalize the vector (make its length 1)
    normalize() {
      const magnitude = this.getMagnitude();
      this.x /= magnitude;
      this.y /= magnitude;
    }
}

//As much as I hate these dream killing mathematics, we need them. -some book IG
export default Vector2;