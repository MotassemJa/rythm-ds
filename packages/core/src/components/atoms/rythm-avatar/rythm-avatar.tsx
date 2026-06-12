import { Component, Prop, State, h, Host } from '@stencil/core';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  tag: 'rythm-avatar',
  styleUrl: 'rythm-avatar.css',
  shadow: true,
})
export class RythmAvatar {
  @Prop() src?: string;
  @Prop() alt?: string;
  /** Up to two initials shown as fallback when no image is provided or it fails to load */
  @Prop() initials?: string;
  /** Lucide icon name used as fallback when no src or initials are provided */
  @Prop() icon: string = 'user';
  @Prop() size: AvatarSize = 'md';
  /** Shape: circle (default) or square */
  @Prop() shape: 'circle' | 'square' = 'circle';

  @State() imgError = false;

  private handleImgError() {
    this.imgError = true;
  }

  render() {
    const showImage = this.src && !this.imgError;
    const showInitials = !showImage && this.initials;
    const showIcon = !showImage && !showInitials;

    return (
      <Host role="img" aria-label={this.alt ?? this.initials ?? 'Avatar'}>
        <div
          class={{
            avatar: true,
            [`avatar--${this.size}`]: true,
            [`avatar--${this.shape}`]: true,
          }}
        >
          {showImage && (
            <img
              src={this.src}
              alt={this.alt ?? ''}
              onError={() => this.handleImgError()}
              class="avatar__img"
            />
          )}
          {showInitials && (
            <span class="avatar__initials" aria-hidden="true">
              {this.initials!.slice(0, 2).toUpperCase()}
            </span>
          )}
          {showIcon && (
            <rythm-icon name={this.icon} size="md" />
          )}
        </div>
      </Host>
    );
  }
}
