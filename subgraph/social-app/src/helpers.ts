import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { User } from "../generated/schema";

// Helper function to get or create a User entity
export function getOrCreateUser(address: Bytes): User {
  let user = User.load(address.toHex());
  if (user == null) {
    user = new User(address.toHex());
    user.userAddress = address;
    user.followersCount = BigInt.fromI32(0);
    user.followingCount = BigInt.fromI32(0);
    user.save();
  }
  return user as User;
}
