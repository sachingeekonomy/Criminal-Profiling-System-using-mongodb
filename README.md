# Criminal Profiling System

A comprehensive criminal profiling system built with NestJS and MongoDB for managing detailed criminal records and related information.

## 🛠️ Tech Stack

- **Backend**: NestJS
- **Database**: MongoDB
- **Documentation**: Swagger
- **Containerization**: Docker

## Database Schema Structure

The system is organized into 7 main schemas, each focusing on specific aspects of criminal profiling:

### 1. **Criminal** (Main Record)
- `name` (required) - Full legal name
- `aliasName` - Alternative names or aliases
- `criminalImageUrl` - URL to criminal's photograph
- `gender` - Gender identity (male/female/other)
- `age` - Current age in years
- `dob` - Date of birth
- `placeOfBirth` - Birth location

### 2. **Address**
- `criminalId` (ObjectId ref) - Reference to Criminal
- `govtAddress` - Address as per government ID
- `currentAddress` - Current residential address
- `otherKnownAddress` - Other known addresses
- `permanentAddress` - Permanent address

### 3. **PhysicalTraits**
- `criminalId` (ObjectId ref) - Reference to Criminal
- `height` - Height in centimeters
- `weight` - Weight in kilograms
- `complexion` - Skin complexion
- `eyeColor` - Eye color
- `hairDescription` - Hair characteristics
- `beard` - Beard description
- `moustache` - Moustache description
- `identificationMark` - Distinctive physical marks

### 4. **PersonalDetails**
- `criminalId` (ObjectId ref) - Reference to Criminal
- `caste` - Social category
- `religion` - Religious affiliation
- `motherTongue` - Native language
- `knownLanguages` - Array of known languages with proficiency
- `smoking` - Smoking habits (yes/no/occasional/former)
- `drinking` - Drinking habits (yes/no/occasional/former)
- `drugs` - Drug usage (yes/no/occasional/former)
- `sexualHabits` - Sexual behavior patterns
- `hobbies` - Array of hobbies and interests
- `vices` - Array of vices or bad habits

### 5. **Occupation**
- `criminalId` (ObjectId ref) - Reference to Criminal
- `occupation` - Current occupation
- `currentIncomeSource` - Primary source of income
- `employerName` - Current employer
- `employerAddress` - Employer's address
- `previousOccupation` - Previous job history

### 6. **Family**
- `criminalId` (ObjectId ref) - Reference to Criminal
- `fatherName`, `fatherOccupation`, `fatherIncome`
- `motherName`, `motherOccupation`, `motherIncome`
- `siblings`, `siblingsOccupation`, `siblingsIncome`
- `spouseName`, `spouseOccupation`, `spouseIncome`
- `children` - Array of children's names

### 7. **GovernmentId**
- `criminalId` (ObjectId ref) - Reference to Criminal
- `aadharNumber` - Aadhar card number
- `panNumber` - PAN card number
- `voterIdNumber`, `voterIssuePlace` - Voter ID details
- `passportNumber`, `passportIssuePlace`, `passportExpiry` - Passport details
- `visaDetails` - Visa information
- `drivingLicense` - Driving license number
- `rationCard`, `rationCardIssuePlace` - Ration card details

## API Endpoints

Each schema has its own set of CRUD endpoints:

- `POST /criminals` - Create criminal record
- `GET /criminals` - Get all criminals
- `GET /criminals/:id` - Get criminal by ID
- `PATCH /criminals/:id` - Update criminal
- `DELETE /criminals/:id` - Delete criminal

Similar endpoints exist for:
- `/addresses`
- `/physical-traits`
- `/personal-details`
- `/occupations`
- `/family-details`
- `/government-ids`

Additional endpoints:
- `GET /physical-traits/criminal/:criminalId` - Get physical traits by criminal ID
- `GET /occupations/criminal/:criminalId` - Get occupation by criminal ID
- And similar endpoints for other related schemas

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB (using Docker):
```bash
docker-compose up -d
```

3. Run the application:
```bash
npm run start:dev
```

## Environment Variables

The application connects to MongoDB using the following connection string:
```
mongodb://username:password@localhost:27017/criminal-profiling?authSource=admin
```

## Features

- **Modular Design**: Each aspect of criminal profiling is separated into its own module
- **Data Validation**: Comprehensive validation using class-validator
- **API Documentation**: Swagger/OpenAPI documentation
- **Error Handling**: Proper error handling and HTTP status codes
- **Type Safety**: Full TypeScript support with proper typing
- **Scalable Architecture**: Easy to extend with additional features

## Contributing

1. Follow the existing code structure
2. Add proper validation to DTOs
3. Include API documentation
4. Write tests for new features
5. Update this README for any schema changes
