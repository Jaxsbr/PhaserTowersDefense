public static float Lerp(float value1, float value2, float amount)
{
    return value1 + (value2 - value1) * amount;
}

public static float ToDegrees(float radians)
{
    return radians * 57.29578f;
}

public static float ToRadians(float degrees)
{
    return degrees * 0.01745329f;
}

public static float Distance(Vector2 value1, Vector2 value2)
{
    float num1 = value1.X - value2.X;
    float num2 = value1.Y - value2.Y;
    return (float) Math.Sqrt((double) num1 * (double) num1 + (double) num2 * (double) num2);
}

public static Vector2 Lerp(Vector2 value1, Vector2 value2, float amount)
{
    return new Vector2(MathHelper.Lerp(value1.X, value2.X, amount), MathHelper.Lerp(value1.Y, value2.Y, amount));
}

public static void Lerp(ref Vector2 value1, ref Vector2 value2, float amount, out Vector2 result)
{
    result = new Vector2(MathHelper.Lerp(value1.X, value2.X, amount), MathHelper.Lerp(value1.Y, value2.Y, amount));
}

public void Normalize()
{
    float num = 1f / (float) Math.Sqrt((double) this.X * (double) this.X + (double) this.Y * (double) this.Y);
    this.X *= num;
    this.Y *= num;
}

public static Vector2 Normalize(Vector2 value)
{
    float num = 1f / (float) Math.Sqrt((double) value.X * (double) value.X + (double) value.Y * (double) value.Y);
    value.X *= num;
    value.Y *= num;
    return value;
}