import React from 'react';

function ProjectEstimator({ formattedData }) {
  return (
    <div>
      <h1>{formattedData.title}</h1>
      
      <section>
        <h2>1. Introduction:</h2>
        <p>{formattedData.introduction}</p>
      </section>

      <section>
        <h2>2. Project Overview:</h2>
        <p>{formattedData.projectOverview}</p>
      </section>

      <section>
        <h2>3. Team Structure:</h2>
        <ul>
          {formattedData.teamStructure.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>4. Project Timeline:</h2>
        <ul>
          {formattedData.projectTimeline.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>5. Estimated Budget:</h2>
        <p>{formattedData.estimatedBudget}</p>
      </section>

      <section>
        <h2>6. Conclusion:</h2>
        <p>{formattedData.conclusion}</p>
      </section>
    </div>
  );
}

export default ProjectEstimator;
