import { readFileSync } from "fs";


export const JwtPublicKey={

    /* public key */
    public:readFileSync("jwt-key.pub"),

    /* private key */
    private:readFileSync("jwt-key")
}