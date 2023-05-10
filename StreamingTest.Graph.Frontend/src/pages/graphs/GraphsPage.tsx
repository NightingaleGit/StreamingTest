import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MainPage from "../MainPage";
import { createChannel, createClientFactory } from "nice-grpc-web";
import {
  CalculatedPointsResult,
  PointsServiceClient,
  PointsServiceDefinition,
  StreamParam,
} from "../../services/PointCalculationService/services";
import { v4 as uuidv4 } from "uuid";
import useGetFormulas from "../../hooks/useGetFormulas";
import { isAbortError } from "abort-controller-x";

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

const MapResponseToPoint = (calculatedPoint: CalculatedPointsResult) => {
  const timeStamp = calculatedPoint.OriginalPoint?.PointTime;
  let timeStampString = "";
  if (timeStamp != null) {
    timeStampString = `${zeroPad(timeStamp.getHours(), 2)}:${zeroPad(
      timeStamp.getMinutes(),
      2
    )}:${zeroPad(timeStamp.getSeconds(), 2)}`;
  }

  const pointsMap = new Map();

  calculatedPoint.CalculatedPoints.forEach((point) =>
    pointsMap.set(point.FormulaId.toString() ?? "", point.Value)
  );

  const graphPoint = Object.fromEntries<unknown>(pointsMap);

  graphPoint.original = calculatedPoint.OriginalPoint?.Value;
  graphPoint.timeStamp = timeStampString;

  return graphPoint;
};

const GraphsPage: React.FC = () => {
  const [data, setData] = useState<unknown[]>([]);
  const [formulas] = useGetFormulas();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [clientId, setClientId] = useState<string>("");

  const [abortController] = useState<AbortController>(() => {
    const abortController = new AbortController();
    return abortController;
  });

  const [client] = useState<PointsServiceClient>(() => {
    const channel = createChannel("http://localhost:8081");
    return createClientFactory().create(PointsServiceDefinition, channel);
  });

  const listen = async (clientId: string) => {
    const params = StreamParam.create({ StreamId: clientId });

    for await (const response of client.receivePoints(params, {
      signal: abortController.signal,
    })) {
      setData((points: unknown[]) =>
        [...points, MapResponseToPoint(response)].slice(-20)
      );
    }
  };

  const connectToServer = async (currentClientId: string) => {
    if (currentClientId == "") {
      currentClientId = uuidv4();
      setClientId(currentClientId);
      const params = StreamParam.create({
        StreamId: currentClientId,
      });
      await client.pushPoints(params);
    }
    setIsConnected(true);
    await listen(currentClientId);
  };

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <MainPage>
      <div className="grid h-full grid-flow-row">
        <div className="flex flex-row">
          <button
            className="
            inline-block
            min-w-fit 
            rounded-md
            border-none 
            bg-signal-active-default py-3 
            px-5 
            text-center 
            text-base 
            no-underline 
            hover:bg-signal-active-dark
            disabled:bg-text-secondary
            "
            type="submit"
            onClick={() => void connectToServer(clientId)}
            disabled={isConnected}
          >
            Connect
          </button>
          <input
            required
            className="w-full appearance-none rounded border-field-border-default bg-field-background-default py-2 px-3 leading-tight shadow hover:border-field-border-hover hover:bg-field-background-hover focus:border-field-border-active focus:ring disabled:bg-field-background-disabled"
            id="clientId"
            name="clientId"
            placeholder="ClientId"
            onChange={(e) => {
              setClientId(e.target.value);
            }}
            value={clientId}
          />
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeStamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name="original"
              dataKey="original"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {formulas.map((formula) => (
              <Line
                key={formula.id}
                type="monotone"
                name={formula.formula}
                dataKey={formula.id}
                stroke={formula.color.hexValue}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MainPage>
  );
};

export default GraphsPage;
