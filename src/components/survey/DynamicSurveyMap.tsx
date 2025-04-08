
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface TopMilitant {
  id: string;
  name: string;
  score: number;
  region: string;
  socialMediaMentions: number;
  rank?: number;
}

interface DynamicSurveyMapProps {
  title?: string;
  description?: string;
  data?: TopMilitant[];
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
}

const DynamicSurveyMap: React.FC<DynamicSurveyMapProps> = ({
  title = "Top 20 Militants MRC",
  description = "Classement des militants les plus actifs basé sur les mentions réseaux sociaux et SEO",
  data = [],
  loading = false,
  error,
  onRefresh
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [sortedData, setSortedData] = useState<TopMilitant[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      // Sort data by score and add rank
      const sorted = [...data]
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, rank: index + 1 }));
      setSortedData(sorted.slice(0, 20)); // Ensure we only have top 20
    }
  }, [data]);

  useEffect(() => {
    if (sortedData.length > 0 && svgRef.current) {
      renderChart();
    }
  }, [sortedData]);

  const renderChart = () => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear previous chart
    svg.selectAll("*").remove();

    // Create a group element for the chart
    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(sortedData, d => d.score) || 100])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleBand()
      .domain(sortedData.map(d => d.name))
      .range([0, chartHeight])
      .padding(0.1);

    // Create color scale
    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, sortedData.length - 1])
      .range(["#3b82f6", "#1e40af"])
      .interpolate(d3.interpolateHcl);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis)
      .append("text")
      .attr("x", chartWidth / 2)
      .attr("y", 35)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Score");

    const yAxis = d3.axisLeft(yScale);
    chart.append("g").attr("class", "y-axis").call(yAxis);

    // Create bars with animation
    chart
      .selectAll(".bar")
      .data(sortedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => yScale(d.name) || 0)
      .attr("height", yScale.bandwidth())
      .attr("x", 0)
      .attr("width", 0) // Start with width 0 for animation
      .attr("fill", (d, i) => colorScale(i))
      .attr("rx", 4) // Rounded corners
      .transition()
      .duration(1000)
      .delay((d, i) => i * 50)
      .attr("width", d => xScale(d.score));

    // Add labels for scores
    chart
      .selectAll(".score-label")
      .data(sortedData)
      .enter()
      .append("text")
      .attr("class", "score-label")
      .attr("x", d => xScale(d.score) + 5)
      .attr("y", d => (yScale(d.name) || 0) + yScale.bandwidth() / 2 + 5)
      .attr("fill", "currentColor")
      .attr("opacity", 0) // Start invisible for animation
      .text(d => d.score)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 50 + 500)
      .attr("opacity", 1);

    // Add rank labels
    chart
      .selectAll(".rank-label")
      .data(sortedData)
      .enter()
      .append("text")
      .attr("class", "rank-label")
      .attr("x", -25)
      .attr("y", d => (yScale(d.name) || 0) + yScale.bandwidth() / 2 + 5)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .attr("font-weight", "bold")
      .text(d => d.rank)
      .attr("opacity", 0) // Start invisible for animation
      .transition()
      .duration(500)
      .delay((d, i) => i * 50)
      .attr("opacity", 1);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sortedData.length > 0) {
        renderChart();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sortedData]);

  const mockData: TopMilitant[] = [
    { id: '1', name: 'Maurice Kamto', score: 95, region: 'Ouest', socialMediaMentions: 1240 },
    { id: '2', name: 'Christian Penda Ekoka', score: 87, region: 'Centre', socialMediaMentions: 830 },
    { id: '3', name: 'Albert Dzongang', score: 82, region: 'Ouest', socialMediaMentions: 720 },
    { id: '4', name: 'Mamadou Mota', score: 78, region: 'Nord', socialMediaMentions: 680 },
    { id: '5', name: 'Alain Fogue', score: 75, region: 'Ouest', socialMediaMentions: 610 },
    { id: '6', name: 'Michelle Ndoki', score: 74, region: 'Littoral', socialMediaMentions: 590 },
    { id: '7', name: 'Célestin Djamen', score: 71, region: 'Ouest', socialMediaMentions: 550 },
    { id: '8', name: 'Paul Eric Kingué', score: 69, region: 'Littoral', socialMediaMentions: 530 },
    { id: '9', name: 'Tiriane Noah', score: 65, region: 'Centre', socialMediaMentions: 480 },
    { id: '10', name: 'Olivier Bibou Nissack', score: 63, region: 'Centre', socialMediaMentions: 450 },
    { id: '11', name: 'Pascal Zamboue', score: 59, region: 'Ouest', socialMediaMentions: 410 },
    { id: '12', name: 'Jean-Michel Nintcheu', score: 57, region: 'Littoral', socialMediaMentions: 390 },
    { id: '13', name: 'Michèle Ambassa', score: 54, region: 'Centre', socialMediaMentions: 350 },
    { id: '14', name: 'Barrister Akere Muna', score: 52, region: 'Nord-Ouest', socialMediaMentions: 340 },
    { id: '15', name: 'Sylvain Souop', score: 50, region: 'Ouest', socialMediaMentions: 320 },
    { id: '16', name: 'Djeukam Tchameni', score: 48, region: 'Ouest', socialMediaMentions: 300 },
    { id: '17', name: 'Tomaino Ndam Njoya', score: 45, region: 'Ouest', socialMediaMentions: 280 },
    { id: '18', name: 'Noah Tchokwé', score: 42, region: 'Sud', socialMediaMentions: 260 },
    { id: '19', name: 'Joseph Kameni', score: 39, region: 'Centre', socialMediaMentions: 240 },
    { id: '20', name: 'Yondo Black', score: 37, region: 'Littoral', socialMediaMentions: 220 },
  ];

  useEffect(() => {
    // Use mockData if no data is provided
    if (data.length === 0 && mockData.length > 0) {
      const sorted = [...mockData]
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, rank: index + 1 }));
      setSortedData(sorted);
    }
  }, [data]);

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mrc-blue"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-96 text-red-500">
            <p className="mb-4">{error}</p>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="px-4 py-2 bg-mrc-blue text-white rounded hover:bg-blue-700"
              >
                Réessayer
              </button>
            )}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <svg ref={svgRef} className="w-full min-h-[500px]"></svg>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicSurveyMap;
