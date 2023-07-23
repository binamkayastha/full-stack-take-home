module Mutations
  class EditChatroom < BaseMutation
    argument :id, ID, required: true
    argument :description, String, required: false
    argument :resolved, Boolean, required: false

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(id:, description:)
      params = { id:, description: }.compact_blank
      chatroom = Chatroom.find_by(id: id)
      chatroom.update(description: description)

      {
        chatroom: chatroom
      }
    end
  end
end
