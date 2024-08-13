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
  if (riskLevel === 5) {
    return colorMatrixExtreme;
  } else if (riskLevel === 4) {
    return colorMatrixHigh;
  } else if (riskLevel === 3) {
    return colorMatrixMedium;
  } else if (riskLevel === 2) {
    return colorMatrixLow;
  } else if (riskLevel === 1) {
    return colorMatrixNegligible;
  } else {
    return "initial";
  }
};

const riskLevels: { [key: string]: number } = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};

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
              <th className="col-risk-matrix">S4</th>
              <th className="col-risk-matrix">S3</th>
              <th className="col-risk-matrix">S2</th>
              <th className="col-risk-matrix">S1</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["P5", ["A", "B", "C", "D"]],
              ["P4", ["A", "B", "C", "D"]],
              ["P3", ["B", "C", "D", "E"]],
              ["P2", ["C", "D", "E", "E"]],
              ["P1", ["D", "E", "E", "E"]],
            ].map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row[0]}</td>
                {row[1].map((riskLevel, colIndex) => (
                  <TdRisk key={colIndex} item={[row[0][1], `${4 - colIndex}`, riskLevels[riskLevel]]} />
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
