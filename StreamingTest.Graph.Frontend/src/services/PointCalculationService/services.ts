/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "StreamingTest.Graph.Backend.Ports.gRPC";

export interface CalculatedPoint {
  Value: number;
  FormulaId: number;
}

export interface CalculatedPointsResult {
  OriginalPoint: Point | undefined;
  CalculatedPoints: CalculatedPoint[];
}

export interface Point {
  PointTime: Date | undefined;
  Value: number;
}

export interface StreamParam {
  StreamId: string;
}

function createBaseCalculatedPoint(): CalculatedPoint {
  return { Value: 0, FormulaId: 0 };
}

export const CalculatedPoint = {
  encode(message: CalculatedPoint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Value !== 0) {
      writer.uint32(9).double(message.Value);
    }
    if (message.FormulaId !== 0) {
      writer.uint32(16).int32(message.FormulaId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalculatedPoint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalculatedPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.Value = reader.double();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.FormulaId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CalculatedPoint>): CalculatedPoint {
    return CalculatedPoint.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CalculatedPoint>): CalculatedPoint {
    const message = createBaseCalculatedPoint();
    message.Value = object.Value ?? 0;
    message.FormulaId = object.FormulaId ?? 0;
    return message;
  },
};

function createBaseCalculatedPointsResult(): CalculatedPointsResult {
  return { OriginalPoint: undefined, CalculatedPoints: [] };
}

export const CalculatedPointsResult = {
  encode(message: CalculatedPointsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.OriginalPoint !== undefined) {
      Point.encode(message.OriginalPoint, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.CalculatedPoints) {
      CalculatedPoint.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalculatedPointsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalculatedPointsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.OriginalPoint = Point.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.CalculatedPoints.push(CalculatedPoint.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CalculatedPointsResult>): CalculatedPointsResult {
    return CalculatedPointsResult.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CalculatedPointsResult>): CalculatedPointsResult {
    const message = createBaseCalculatedPointsResult();
    message.OriginalPoint = (object.OriginalPoint !== undefined && object.OriginalPoint !== null)
      ? Point.fromPartial(object.OriginalPoint)
      : undefined;
    message.CalculatedPoints = object.CalculatedPoints?.map((e) => CalculatedPoint.fromPartial(e)) || [];
    return message;
  },
};

function createBasePoint(): Point {
  return { PointTime: undefined, Value: 0 };
}

export const Point = {
  encode(message: Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.PointTime !== undefined) {
      Timestamp.encode(toTimestamp(message.PointTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.Value !== 0) {
      writer.uint32(17).double(message.Value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Point {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.PointTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.Value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Point>): Point {
    return Point.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Point>): Point {
    const message = createBasePoint();
    message.PointTime = object.PointTime ?? undefined;
    message.Value = object.Value ?? 0;
    return message;
  },
};

function createBaseStreamParam(): StreamParam {
  return { StreamId: "" };
}

export const StreamParam = {
  encode(message: StreamParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.StreamId !== "") {
      writer.uint32(10).string(message.StreamId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.StreamId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<StreamParam>): StreamParam {
    return StreamParam.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<StreamParam>): StreamParam {
    const message = createBaseStreamParam();
    message.StreamId = object.StreamId ?? "";
    return message;
  },
};

export type PointsServiceDefinition = typeof PointsServiceDefinition;
export const PointsServiceDefinition = {
  name: "PointsService",
  fullName: "StreamingTest.Graph.Backend.Ports.gRPC.PointsService",
  methods: {
    pushPoints: {
      name: "PushPoints",
      requestType: StreamParam,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    receivePoints: {
      name: "ReceivePoints",
      requestType: StreamParam,
      requestStream: false,
      responseType: CalculatedPointsResult,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface PointsServiceImplementation<CallContextExt = {}> {
  pushPoints(request: StreamParam, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  receivePoints(
    request: StreamParam,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DeepPartial<CalculatedPointsResult>>;
}

export interface PointsServiceClient<CallOptionsExt = {}> {
  pushPoints(request: DeepPartial<StreamParam>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  receivePoints(
    request: DeepPartial<StreamParam>,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<CalculatedPointsResult>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
