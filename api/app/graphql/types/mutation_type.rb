module Types
  class MutationType < Types::BaseObject
    field :create_chatroom, mutation: Mutations::CreateChatroom
    field :edit_chatroom_description, mutation: Mutations::EditChatroomDescription
  end
end
