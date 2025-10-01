import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Droplets, CloudRain, ThermometerSun, Shield } from "lucide-react";

type RiskLevel = "low" | "moderate" | "high" | "severe";

interface PredictionResult {
  riskLevel: RiskLevel;
  probability: number;
  advice: string[];
}

const Index = () => {
  const [region, setRegion] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const indianRegions = [
    "Mumbai, Maharashtra",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Assam",
    "Bihar",
    "Kerala",
    "Odisha",
    "Uttarakhand",
    "Gujarat",
    "Andhra Pradesh"
  ];

  const predictFloodRisk = () => {
    const rainfallValue = parseFloat(rainfall);
    const tempValue = parseFloat(temperature);
    const humidityValue = parseFloat(humidity);

    // Simple flood risk calculation algorithm
    let riskScore = 0;
    
    if (rainfallValue > 200) riskScore += 40;
    else if (rainfallValue > 150) riskScore += 30;
    else if (rainfallValue > 100) riskScore += 20;
    else if (rainfallValue > 50) riskScore += 10;

    if (humidityValue > 85) riskScore += 25;
    else if (humidityValue > 70) riskScore += 15;
    else if (humidityValue > 50) riskScore += 5;

    if (tempValue > 35) riskScore += 15;
    else if (tempValue > 30) riskScore += 10;

    let riskLevel: RiskLevel;
    let advice: string[];

    if (riskScore >= 70) {
      riskLevel = "severe";
      advice = [
        "⚠️ IMMEDIATE EVACUATION RECOMMENDED",
        "Move to higher ground immediately",
        "Avoid walking or driving through flood waters",
        "Keep emergency supplies ready (food, water, medicines)",
        "Stay tuned to local weather updates",
        "Contact local disaster management authorities"
      ];
    } else if (riskScore >= 50) {
      riskLevel = "high";
      advice = [
        "High flood risk detected - prepare for possible evacuation",
        "Move valuable items to higher floors",
        "Charge electronic devices and keep flashlights ready",
        "Avoid low-lying areas and river banks",
        "Keep important documents in waterproof containers",
        "Monitor weather forecasts regularly"
      ];
    } else if (riskScore >= 30) {
      riskLevel = "moderate";
      advice = [
        "Moderate flood risk - stay alert",
        "Prepare emergency kit with essentials",
        "Clear drainage around your property",
        "Avoid unnecessary travel during heavy rain",
        "Keep emergency contact numbers handy",
        "Stay informed about weather conditions"
      ];
    } else {
      riskLevel = "low";
      advice = [
        "Low flood risk currently",
        "Continue normal activities with caution",
        "Keep basic emergency supplies ready",
        "Stay updated with weather forecasts",
        "Ensure proper drainage maintenance"
      ];
    }

    setPrediction({
      riskLevel,
      probability: riskScore,
      advice
    });
  };

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case "severe": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-orange-500 text-white";
      case "moderate": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-primary">FloodGuard</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Flood Prediction System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold">Protect Your Region from Floods</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Enter weather conditions to get real-time flood risk predictions and safety recommendations for your area
          </p>
        </section>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5" />
                Weather Data Input
              </CardTitle>
              <CardDescription>
                Enter current weather conditions for flood prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select Indian region" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianRegions.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rainfall" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Rainfall (mm/24hrs)
                </Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="e.g., 150"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <ThermometerSun className="h-4 w-4" />
                  Temperature (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="e.g., 32"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  placeholder="e.g., 85"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </div>

              <Button 
                onClick={predictFloodRisk} 
                className="w-full"
                disabled={!region || !rainfall || !temperature || !humidity}
              >
                Predict Flood Risk
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {prediction ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Flood Risk Assessment
                    </CardTitle>
                    <CardDescription>Based on current weather conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 text-sm text-muted-foreground">Region: {region}</p>
                        <div className={`rounded-lg p-4 text-center ${getRiskColor(prediction.riskLevel)}`}>
                          <p className="text-sm font-medium uppercase">Risk Level</p>
                          <p className="text-3xl font-bold uppercase">{prediction.riskLevel}</p>
                          <p className="text-sm mt-1">Risk Score: {prediction.probability}/100</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Safety Recommendations</AlertTitle>
                  <AlertDescription>
                    <ul className="mt-2 space-y-2">
                      {prediction.advice.map((item, index) => (
                        <li key={index} className="text-sm">• {item}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Results</CardTitle>
                  <CardDescription>Enter weather data to see flood risk prediction</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-center text-muted-foreground">
                    Fill in the form and click "Predict Flood Risk" to see results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>About FloodGuard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                FloodGuard uses advanced algorithms to analyze weather patterns including rainfall, temperature, and humidity 
                to predict flood risks in various regions of India. Our system provides actionable safety recommendations 
                to help communities prepare for and respond to potential flooding events.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mt-12 border-t bg-background py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FloodGuard. Helping protect communities from floods.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
