import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { careers } from '../services/api';

interface EducationPathStep {
  level: string;
  description: string;
}

// Define interface for the full career object
interface CareerDetails {
  title: string;
  Description: string; // Note: Check capitalization if needed, based on actual JSON
  education_paths: EducationPathStep[];
  Skills: string[];
  "Career Progression": string; // Handle spaces in key name
  "Market Demand": string; // Handle spaces in key name
  Salary: string;
  Certifications: string[];
  "Top Companies"?: string[];
  "Top_Companies"?: string[];
  ten_year_path: any[]; // Assuming this is an array, type might need refinement
}

const CareerPathPage: React.FC = () => {
  const { careerTitle } = useParams<{ careerTitle: string }>();
  // Change state to hold the full career object
  const [career, setCareer] = useState<CareerDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareerPath = async () => {
      if (!careerTitle) {
        setError("Career title is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch the full response object as per our previous fix
        const response = await careers.getCareerPath(careerTitle);
        console.log("API response in getCareerPath:", response);
        console.log("Data received from API:", response.data);
        console.log("Top Companies data:", response.data["Top Companies"]);
        console.log("Top Companies type:", typeof response.data["Top Companies"]);
        
        // Set the entire data object (which should be the career) to the state
        // Assuming response.data contains the CareerDetails object
        if (response.data) {
             setCareer(response.data);
        } else {
            // Handle case where data is not as expected, though previous logs suggest it is
             setError("Received empty data for career path.");
        }
       
        setLoading(false);
      } catch (err) {
        console.error("Error fetching career path:", err);
        setError("Failed to load career path data.");
        setLoading(false);
      }
    };

    fetchCareerPath();
  }, [careerTitle]);

  if (loading) {
    return <div className="text-center py-8">Loading career path...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  // Check if career data is loaded and has education paths to display
  if (!career || !career.education_paths || career.education_paths.length === 0) {
    return <div className="text-center py-8">No detailed education path found for {careerTitle}.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 mb-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">{career.title || careerTitle}</h1>

      {/* Display Description */}
      <div className="mb-8 p-4 bg-blue-50 rounded-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">{career.Description}</p>
      </div>

      {/* Display Education Path */}
      <div className="mb-8 p-4 bg-green-50 rounded-md">
         <h2 className="text-2xl font-semibold text-green-600 mb-4">Education Path Steps</h2>
         <ul>
           {career.education_paths.map((step, index) => (
             <li key={index} className="mb-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
               <strong className="text-lg text-gray-800">{step.level}:</strong> <span className="text-gray-600">{step.description}</span>
             </li>
           ))}
         </ul>
      </div>

      {/* Display Ten Year Path */}
      {career.ten_year_path && career.ten_year_path.length > 0 && (
        <div className="mb-8 p-4 bg-blue-100 rounded-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Ten Year Career Path</h2>
          <ul>
            {career.ten_year_path.map((pathStep, index) => (
              <li key={index} className="mb-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
                <strong className="text-lg text-gray-800">Year {pathStep.year}:</strong> <span className="text-gray-600">{pathStep.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Skills */}
       {career.Skills && career.Skills.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-50 rounded-md">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-3">Skills</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {career.Skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
       )}

       {/* Display Career Progression */}
       {career["Career Progression"] && (
         <div className="mb-8 p-4 bg-purple-50 rounded-md">
           <h2 className="text-2xl font-semibold text-purple-600 mb-3">Career Progression</h2>
           <p className="text-gray-700 leading-relaxed">{career["Career Progression"]}</p>
         </div>
       )}

       {/* Display Market Demand */}
       {career["Market Demand"] && (
         <div className="mb-8 p-4 bg-red-50 rounded-md">
           <h2 className="text-2xl font-semibold text-red-600 mb-3">Market Demand</h2>
           <p className="text-gray-700 leading-relaxed">{career["Market Demand"]}</p>
         </div>
       )}

       {/* Display Salary */}
       {career.Salary && (
         <div className="mb-8 p-4 bg-indigo-50 rounded-md">
           <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Salary</h2>
           <p className="text-gray-700 leading-relaxed">{career.Salary}</p>
         </div>
       )}

       {/* Display Certifications */}
       {career.Certifications && (
        <div className="mb-8 p-4 bg-pink-50 rounded-md">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3">Certifications</h2>
          {typeof career.Certifications === 'string' ? (
            <p className="text-gray-700 leading-relaxed">{career.Certifications}</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {career.Certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          )}
        </div>
       )}

       {/* Display Top Companies */}
       {(career["Top Companies"] || career["Top_Companies"]) && (
        <div className="mb-8 p-4 bg-teal-50 rounded-md">
          <h2 className="text-2xl font-semibold text-teal-600 mb-3">Top Companies</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {(() => {
              const companies = career["Top Companies"] || career["Top_Companies"];
              return typeof companies === 'string' 
                ? (companies as string)
                    .split('.')
                    .filter((company: string) => company.trim())
                    .map((company: string, index: number) => (
                      <li key={index}>{company.trim()}</li>
                    ))
                : (companies as string[]).map((company: string, index: number) => (
                    <li key={index}>{company}</li>
                  ));
            })()}
          </ul>
        </div>
       )}



    </div>
  );
};

export default CareerPathPage; 