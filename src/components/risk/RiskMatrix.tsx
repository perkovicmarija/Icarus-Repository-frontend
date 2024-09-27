import React from "react";
import { TdRisk, RiskProvider } from "./TdRisk";

export const colorMatrixExtreme = "#FF0000";
export const colorMatrixHigh = "#FFBE00";
export const colorMatrixHighGold = "#c3922e";
export const colorMatrixMedium = "#FFFF25";
export const colorMatrixMediumELY = "#c6c622";
export const colorMatrixLow = "#F6F29A";
export const colorMatrixLowSAH = "#92D050";
export const colorMatrixNegligible = "#7CD254";
export const colorMatrixNegligibleELY = "#00B050";
export const colorMatrixNegligibleSAH = "#00B050";

export const getRiskMatrixRiskLevelColorDefault = (riskLevel: number): string => {
  if (riskLevel <= 4) {
    return colorMatrixNegligible;
  } else if (riskLevel <= 14) {
    return colorMatrixMedium;
  } else if (riskLevel <= 25) {
    return colorMatrixExtreme;
  } else {
    return "initial";
  }
};

const frequencyTable = [
  ["Frequent - 5", ["5", "5", "5", "4", "4"]],
  ["Occasional - 4", ["5", "5", "4", "4", "3"]],
  ["Remote - 3", ["5", "4", "4", "4", "3"]],
  ["Improbable - 2", ["4", "4", "4", "3", "3"]],
  ["Extremely improbable - 1", ["4", "3", "3", "3", "3"]],
];

interface RiskMatrixProps {
  object: {
    probability: string;
    severity: string;
  };
  onRiskMatrixChange?: (probability: string, severity: string, riskLevel: number) => void;
  title?: string;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ object, onRiskMatrixChange, title }) => {
  return (
    <RiskProvider.Provider
      value={{
        object,
        colorFunction: getRiskMatrixRiskLevelColorDefault,
        onClick: onRiskMatrixChange,
      }}
    >
      <div>
        <table className="table table-bordered table-risk-matrix">
          <thead>
            <tr>
              <th className="col-risk-matrix-lead"></th>
              <th className="col-risk-matrix">Catastrophic - 5</th>
              <th className="col-risk-matrix">Hazardous - 4</th>
              <th className="col-risk-matrix">Major - 3</th>
              <th className="col-risk-matrix">Minor - 2</th>
              <th className="col-risk-matrix">Negliable - 1</th>
            </tr>
          </thead>
          <tbody>
            {frequencyTable.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row[0]}</td>
                {row[1].map((riskLevel, colIndex) => (
                  <TdRisk
                  key={colIndex}
                  item={[
                    row[0].split("- ")[1], 
                    `${5 - colIndex}`, 
                    Number.parseInt(row[0].split("- ")[1]) * (frequencyTable.length - colIndex)
                  ]}
                />  
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RiskProvider.Provider>
  );
};

export default RiskMatrix;
