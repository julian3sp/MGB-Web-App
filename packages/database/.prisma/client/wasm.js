
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.EmployeeScalarFieldEnum = {
  id: 'id',
  employee_name: 'employee_name',
  created_at: 'created_at'
};

exports.Prisma.Service_requestScalarFieldEnum = {
  request_id: 'request_id',
  name: 'name',
  employee_id: 'employee_id',
  priority: 'priority',
  location: 'location',
  department: 'department',
  status: 'status',
  request_type: 'request_type',
  request_date: 'request_date',
  additional_comments: 'additional_comments',
  assigned_employee: 'assigned_employee'
};

exports.Prisma.SanitationScalarFieldEnum = {
  request_id: 'request_id',
  cleaningType: 'cleaningType',
  contaminant: 'contaminant',
  sanitationId: 'sanitationId'
};

exports.Prisma.LanguageScalarFieldEnum = {
  request_id: 'request_id',
  sourceLanguage: 'sourceLanguage',
  targetLanguage: 'targetLanguage',
  languageId: 'languageId'
};

exports.Prisma.TransportationScalarFieldEnum = {
  request_id: 'request_id',
  transportationType: 'transportationType',
  transportationDestination: 'transportationDestination',
  transportationId: 'transportationId'
};

exports.Prisma.AudioVisualScalarFieldEnum = {
  request_id: 'request_id',
  accommodationType: 'accommodationType',
  accommodationDetails: 'accommodationDetails',
  audioVisualId: 'audioVisualId'
};

exports.Prisma.SecurityScalarFieldEnum = {
  request_id: 'request_id',
  accessZones: 'accessZones',
  securityIssue: 'securityIssue',
  securityId: 'securityId'
};

exports.Prisma.MedicalDeviceScalarFieldEnum = {
  request_id: 'request_id',
  device: 'device',
  operatorRequired: 'operatorRequired',
  medicalDeviceId: 'medicalDeviceId'
};

exports.Prisma.FacilitiesScalarFieldEnum = {
  request_id: 'request_id',
  maintenanceType: 'maintenanceType',
  equipmentType: 'equipmentType',
  facilitiesID: 'facilitiesID'
};

exports.Prisma.DirectoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  services: 'services',
  location: 'location',
  telephone: 'telephone'
};

exports.Prisma.UsersScalarFieldEnum = {
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  password: 'password'
};

exports.Prisma.NodesScalarFieldEnum = {
  id: 'id',
  building: 'building',
  floor: 'floor',
  name: 'name',
  x: 'x',
  y: 'y',
  edgeCost: 'edgeCost',
  totalCost: 'totalCost'
};

exports.Prisma.EdgesScalarFieldEnum = {
  id: 'id',
  sourceId: 'sourceId',
  targetId: 'targetId',
  weight: 'weight'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  employee: 'employee',
  service_request: 'service_request',
  Sanitation: 'Sanitation',
  Language: 'Language',
  Transportation: 'Transportation',
  AudioVisual: 'AudioVisual',
  Security: 'Security',
  MedicalDevice: 'MedicalDevice',
  Facilities: 'Facilities',
  directory: 'directory',
  users: 'users',
  nodes: 'nodes',
  edges: 'edges'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
