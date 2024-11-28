import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="text-sm text-muted-foreground text-center pt-16">
      Have a great brew,{" "}
      <a href="https://junaidanjum.com" target="_blank">
        <Button variant="link" className="mx-0 px-0">
          Junaid A.
        </Button>
      </a>{" "}
    </div>
  );
};

export default Footer;
