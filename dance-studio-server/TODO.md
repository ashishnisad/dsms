# StudioLAB Backend Development Plan

## Phase 1: Configuration Files
- [ ] src/config/db.js - MongoDB connection
- [ ] src/config/env.js - Environment variables
- [ ] src/config/logger.js - Logging setup

## Phase 2: Constants & Utils
- [ ] src/constants/roles.js - User roles
- [ ] src/constants/statuses.js - Status enums
- [ ] src/utils/response.js - Response helper
- [ ] src/utils/hashPassword.js - Password hashing
- [ ] src/utils/generateToken.js - JWT token generation
- [ ] src/utils/pagination.js - Pagination utility
- [ ] src/utils/generatePDF.js - PDF generation

## Phase 3: Models
- [ ] src/models/User.model.js
- [ ] src/models/Student.model.js
- [ ] src/models/Teacher.model.js
- [ ] src/models/Class.model.js
- [ ] src/models/Session.model.js
- [ ] src/models/Attendance.model.js
- [ ] src/models/Invoice.model.js
- [ ] src/models/Payment.model.js
- [ ] src/models/Settings.model.js

## Phase 4: Middlewares
- [ ] src/middlewares/auth.middleware.js
- [ ] src/middlewares/role.middleware.js
- [ ] src/middlewares/validate.middleware.js
- [ ] src/middlewares/error.middleware.js

## Phase 5: Validators
- [ ] src/validators/auth.validator.js
- [ ] src/validators/student.validator.js
- [ ] src/validators/invoice.validator.js

## Phase 6: Services
- [ ] src/services/auth.service.js
- [ ] src/services/student.service.js
- [ ] src/services/teacher.service.js
- [ ] src/services/schedule.service.js
- [ ] src/services/billing.service.js
- [ ] src/services/report.service.js

## Phase 7: Controllers
- [ ] src/controllers/auth.controller.js
- [ ] src/controllers/student.controller.js
- [ ] src/controllers/teacher.controller.js
- [ ] src/controllers/schedule.controller.js
- [ ] src/controllers/billing.controller.js
- [ ] src/controllers/report.controller.js
- [ ] src/controllers/settings.controller.js

## Phase 8: Routes
- [ ] src/routes/auth.routes.js
- [ ] src/routes/student.routes.js
- [ ] src/routes/teacher.routes.js
- [ ] src/routes/schedule.routes.js
- [ ] src/routes/billing.routes.js
- [ ] src/routes/report.routes.js
- [ ] src/routes/settings.routes.js

## Phase 9: App Entry Points
- [ ] src/app.js - Express app setup
- [ ] src/server.js - Server entry point
- [ ] .env - Environment configuration
