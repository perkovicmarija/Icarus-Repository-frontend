import React, { createContext, useContext } from "react";

interface RiskProviderProps {
  object: {
    probability: string;
    severity: string;
  };
  colorFunction: (riskLevel: number) => string;
  onClick?: (probability: string, severity: string, riskLevel: number) => void;
}

export const RiskProvider = createContext<RiskProviderProps | undefined>(undefined);

interface TdRiskProps {
  item: [string, string, number];
}

export const TdRisk: React.FC<TdRiskProps> = ({ item }) => {
  const [prob, sev, riskLevel] = item;
  const context = useContext(RiskProvider);

  if (!context) {
    throw new Error("TdRisk must be used within a RiskProvider");
  }

  const { object, colorFunction, onClick } = context;

  const selected = object.probability === prob && object.severity === sev;

  const handleClick = () => {
    if (onClick) {
      onClick(prob, sev, riskLevel);
    }
  };

  return (
    <td
      onClick={handleClick}
      style={{
        background: colorFunction(riskLevel),
        fontWeight: "bold",
        color: "black",
        cursor: onClick ? "pointer" : "default",
        padding: 0,
        border: "1px solid #DDD",
      }}
    >
      <div
        style={{
          border: selected ? "5px solid blue" : "0px solid #EEEEEE",
          padding: selected ? "11px" : "16px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {riskLevel}
      </div>
    </td>
  );
};
