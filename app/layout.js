import "./globals.css";

export const metadata = {
  title: "DutchExam – Inburgering Exam Trainer",
  description: "Prepare for the Dutch inburgering exam with realistic practice tests, smart analytics and personal progress tracking."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
