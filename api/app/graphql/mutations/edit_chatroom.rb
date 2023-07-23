module Mutations
  class EditChatroom < BaseMutation
    argument :id, ID, required: true
    argument :description, String, required: false
    argument :resolved, Boolean, required: false

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(id:, description:nil, resolved:nil)
      if description.nil? and resolved.nil?
        raise GraphQL::ExecutionError, "At least one field must be updated when calling EditChatroom with id %s" % id
      end
      chatroom = Chatroom.find_by(id: id)
      if !description.nil?
        chatroom.update(description: description)
      end
      if !resolved.nil?
        chatroom.update(resolved: resolved)
      end

      {
        chatroom: chatroom
      }
    end
  end
end
