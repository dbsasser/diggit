class UpvoteSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :submission
end
