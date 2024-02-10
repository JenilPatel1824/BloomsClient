import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledGeneralComponent = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const AnnouncementTitle = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToField = styled.label`
  margin-bottom: 15px;

  span {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }
`;

const EmailBody = styled.label`
  margin-bottom: 15px;

  .email-text {
    font-weight: bold;
    margin-bottom: 5px;
  }

  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }
`;

const LoadingSymbol = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
  transition: opacity 0.3s;
`;

const SendButtonContainer = styled.div`
  position: relative;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
  opacity: ${({ isLoading }) => (isLoading ? '0' : '1')};
  transition: opacity 0.3s;

  &:hover {
    background-color: ${({ isLoading }) => (isLoading ? '#007bff' : '#0056b3')};
  }
`;

const GeneralComponent2 = () => {
  const [emailBody, setEmailBody] = useState("");
  const [recipients, setRecipients] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show form with a fade-in animation after component mounts
    setShowForm(true);
  }, []);

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const handleRecipientsChange = (e) => {
    setRecipients(e.target.value);
  };

  const handleSendClick = async () => {
    if (emailBody && recipients && !isLoading) {
      try {
        setIsLoading(true);
        const response2 = await fetch(`${process.env.REACT_APP_API_URL}` + "/massemailsender", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailBody, recipients }),
        });

        const data = await response2.json();
        setSuccessMessage(data.message);

        // Clear form fields after successful send
        setEmailBody("");
        setRecipients("");
      } catch (error) {
        console.error("Error sending email:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>AnnouncementMail</h2>
    <CenteredContainer>
      <StyledGeneralComponent>
        <AnnouncementTitle>AnnouncementMail</AnnouncementTitle>
        <div className={`announcement-mail-container ${showForm ? 'fade-in' : ''}`}>
          {successMessage && (
            <SuccessMessage>{successMessage}</SuccessMessage>
          )}

          <FormContainer>
            <ToField>
              <span>To:</span>
              <input
                type="text"
                value={recipients}
                onChange={handleRecipientsChange}
                placeholder="Enter recipients (e.g., Student, Faculty)"
              />
            </ToField>

            <EmailBody>
              <div className="email-text">Email Body:</div>
              <textarea
                value={emailBody}
                onChange={handleEmailBodyChange}
                rows="4"
                placeholder="Enter your email content here..."
              />
            </EmailBody>

            <SendButtonContainer>
              <SendButton onClick={handleSendClick} isLoading={isLoading}>
                <FontAwesomeIcon icon={faPaperPlane} /> Send
              </SendButton>
              <LoadingSymbol isLoading={isLoading}>⌛</LoadingSymbol>
            </SendButtonContainer>
          </FormContainer>
        </div>
      </StyledGeneralComponent>
    </CenteredContainer>
    </div>
  );
};

export default GeneralComponent2;
