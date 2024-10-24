"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart, Label } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getDefectsAll } from "./actions"
import { useEffect, useState } from "react"

export const description = "A pie chart with a label"

// Function to generate colors dynamically
const generateColor = (index: number) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    // Add more colors or cycle through the palette as needed
  ]
  return colors[index % colors.length]
}

interface BarChartGraphProps {
  date: string
  obbSheetId: string
}

export function PieComponent({ date, obbSheetId }: BarChartGraphProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [chartConfig, setChartConfig] = useState<any>({})

  const fetchData = async () => {
    try {
      let resp: any = await getDefectsAll(obbSheetId, date + "%")

      // Transform data to match the chart requirements and assign dynamic colors
      const data: any = resp.map((item: any, index: number) => ({
        name: item.name + " - " + item.part,
        visitors: parseInt(item.defectcount), // Ensure defectcount is a number
        fill: generateColor(index), // Generate dynamic color
      }))

      setChartData(data)

      // Generate chart config dynamically
      const config: any = resp.reduce((acc: any, item: any, index: number) => {
        const key = item.name + " - " + item.part
        acc[key] = {
          label: key,
          color: generateColor(index),
        }
        return acc
      }, {})

      setChartConfig({
        visitors: {
          label: "Visitors",
        },
        ...config,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [date, obbSheetId])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - All Defects</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 bg-slate-200">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[600px] w-full max-w-[800px] pb-0" // Increased size of chart
        >
          <PieChart width={500} height={500} > {/* Increased width and height */}
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="name"
              className="shadow-xl"
              outerRadius={180} // Increased outer radius
              innerRadius={80} // Adjust inner radius to create a better visual balance
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                // Calculate the position to place the label in the center of each slice
                const RADIAN = Math.PI / 180
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)
                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {value} {/* Display the defect count inside the slice */}
                  </text>
                )
              }}
            >
              {/* Use LabelList to position the names outside the slices */}
              <LabelList
                dataKey="name"
                position="outside" // Ensure it's explicitly outside
                offset={30} // Adjust the distance from the pie
                fill="black" // Set text color to black for better visibility
                fontSize={14} // Slightly larger font for better readability
                stroke="none"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
       
        <div className="leading-none text-muted-foreground">
          Showing total defects for the selected OBB sheet
        </div>
      </CardFooter>
    </Card>
  )
}
