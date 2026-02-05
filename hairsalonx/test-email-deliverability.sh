#!/usr/bin/env bash
# Test script for P0 Auth email deliverability
# Tests: Resend configuration, email sending, signup flow

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "P0 Auth Email Deliverability Test"
echo "=========================================="

# Configuration
BASE_URL="${BASE_URL:-http://localhost:3000}"
TEST_EMAIL="${TEST_EMAIL:-test@example.com}"

echo ""
echo "Base URL: $BASE_URL"
echo "Test Email: $TEST_EMAIL"
echo ""

# Test 1: Health Check
echo "Test 1: Email Service Health Check"
echo "------------------------------------"
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/health/email" 2>/dev/null || echo "error")
HEALTH_STATUS=$(echo "$HEALTH_RESPONSE" | tail -n1)
HEALTH_BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

if [ "$HEALTH_STATUS" = "200" ]; then
    echo -e "${GREEN}✓ Health check passed (200)${NC}"
    echo "Response: $HEALTH_BODY" | head -c 500
    echo ""
elif [ "$HEALTH_STATUS" = "503" ]; then
    echo -e "${YELLOW}⚠ Service degraded (503)${NC}"
    echo "Response: $HEALTH_BODY"
    echo ""
    echo -e "${YELLOW}Note: Email service may not be fully configured${NC}"
else
    echo -e "${RED}✗ Health check failed (Status: $HEALTH_STATUS)${NC}"
    echo "Response: $HEALTH_BODY"
fi
echo ""

# Test 2: Send Test Email (if configured)
echo "Test 2: Send Test Email"
echo "------------------------"
TEST_EMAIL_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "{\"to\": \"$TEST_EMAIL\", \"template\": \"signupConfirmation\", \"data\": {\"email\": \"$TEST_EMAIL\", \"confirmationUrl\": \"https://example.com/confirm?token=test123\", \"salonName\": \"Test Salon\"}}" \
    "$BASE_URL/api/email/send" 2>/dev/null || echo "error")

TEST_EMAIL_STATUS=$(echo "$TEST_EMAIL_RESPONSE" | tail -n1)
TEST_EMAIL_BODY=$(echo "$TEST_EMAIL_RESPONSE" | sed '$d')

if [ "$TEST_EMAIL_STATUS" = "200" ]; then
    echo -e "${GREEN}✓ Test email sent successfully (200)${NC}"
    echo "Response: $TEST_EMAIL_BODY"
elif [ "$TEST_EMAIL_STATUS" = "503" ]; then
    echo -e "${YELLOW}⚠ Email service not configured (503)${NC}"
    echo "Response: $TEST_EMAIL_BODY"
    echo ""
    echo -e "${YELLOW}Action needed: Set RESEND_API_KEY in environment${NC}"
else
    echo -e "${RED}✗ Test email failed (Status: $TEST_EMAIL_STATUS)${NC}"
    echo "Response: $TEST_EMAIL_BODY"
fi
echo ""

echo "=========================================="
echo "Curl Commands for Manual Testing"
echo "=========================================="
echo ""
echo "# Health check:"
echo "curl $BASE_URL/api/health/email"
echo ""
echo "# Send test email:"
echo "curl -X POST $BASE_URL/api/email/send -H 'Content-Type: application/json' -d '{\"to\": \"test@example.com\", \"template\": \"signupConfirmation\", \"data\": {\"email\": \"test@example.com\", \"confirmationUrl\": \"https://example.com/confirm?token=test123\"}}'"
echo ""
