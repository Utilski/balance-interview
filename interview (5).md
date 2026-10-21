As a financial service provider, I want a fee calculation web service with two endpoints, So that I can dynamically load fee structures and calculate fees for different transaction types and amounts.

## Acceptance Criteria:

1. The service should have a GET endpoint for fee calculation:
   - Endpoint: `GET [schema]:[host]:[port]/fees`
   - Query Parameters:
     - `total`: The transaction amount (numeric)
     - `type`: The type of fee (string)
   - Response: The calculated fee as a numeric value
2. The service should have a POST endpoint for loading fee structures:
   - Endpoint: `POST [schema]:[host]:[port]/fees`
   - Request Body: JSON object with a "url" field containing the URL of a CSV file
   - The CSV file should contain fee rules with columns: [fee type], [from amount], [to amount], [percentage value]
   - Response: Confirmation of successful fee structure update
3. Each new POST request to load fee structures should reset existing values
4. The GET endpoint should calculate fees based on the most recently loaded fee structure
5. The service should handle errors gracefully, providing appropriate error messages for invalid inputs or when no applicable fee rule is found
6. The fee calculation should be optimized for performance, aiming for best possible time complexity.

## Additional Notes:

- The service should be flexible enough to handle different fee structures without code changes
- Consider memory usage and performance tradeoffs in the implementation
- Ensure the service can handle concurrent requests efficiently

### Example CSV line:

```csv
clearing, 0, 500, 0.0
```

Example file URLs:
[first example](https://balance-interview-exercise.s3.us-east-2.amazonaws.com/bank_transaction_fees.csv)
[second example](https://balance-interview-exercise.s3.us-east-2.amazonaws.com/bank_transaction_fees_2.csv)

### Example test curl requests (change the port, if needed, to match your local setup):

```shell
curl -X POST http://127.0.0.1:8081/fees -H 'Content-Type: application/json' -d '{"url": "https://balance-interview-exercise.s3.us-east-2.amazonaws.com/bank_transaction_fees.csv"}'
```

```shell
curl 'http://127.0.0.1:8081/fees?total=507&type=clearing'
```
